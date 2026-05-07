import zipfile
import xml.etree.ElementTree as ET
import sys

def extract_text_from_docx(docx_path):
    try:
        with zipfile.ZipFile(docx_path) as z:
            xml_content = z.read('word/document.xml')
        
        tree = ET.fromstring(xml_content)
        
        # Namespaces
        namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        texts = []
        for paragraph in tree.findall('.//w:p', namespaces):
            para_text = []
            for run in paragraph.findall('.//w:r', namespaces):
                text_node = run.find('w:t', namespaces)
                if text_node is not None and text_node.text:
                    para_text.append(text_node.text)
            if para_text:
                texts.append(''.join(para_text))
                
        return '\n'.join(texts)
    except Exception as e:
        return f"Error reading {docx_path}: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        print(f"--- {sys.argv[1]} ---")
        print(extract_text_from_docx(sys.argv[1]))
        print("\n")
