import re

def process_file(filename, css_out, js_out):
    with open(filename, 'r') as f:
        content = f.read()

    # Extract CSS
    style_pattern = re.compile(r'<style>(.*?)</style>', re.DOTALL)
    styles = style_pattern.findall(content)
    if styles:
        with open(css_out, 'w') as f:
            f.write(styles[0])
        content = style_pattern.sub(f'<link rel="stylesheet" href="{css_out}">', content)

    # Extract JS
    script_pattern = re.compile(r'<script>(.*?)</script>', re.DOTALL)
    scripts = script_pattern.findall(content)
    if scripts:
        with open(js_out, 'w') as f:
            f.write(scripts[0])
        content = script_pattern.sub(f'<script src="{js_out}"></script>', content)

    with open(filename, 'w') as f:
        f.write(content)

process_file('index.html', 'css/style.css', 'js/main.js')
process_file('dashboard.html', 'css/dashboard.css', 'js/dashboard.js')
print("Extraction complete.")
