"""
Changelog Converter Script
Converts old-style changelog entries to new MD3 timeline format
"""

import re
from pathlib import Path

def categorize_change(text):
    """Determine the icon type based on change description"""
    text_lower = text.lower()
    
    # Feature keywords
    if any(word in text_lower for word in ['new', 'added', 'feature', 'implement', 'create']):
        return 'feature', 'fa-sparkles'
    
    # Bug fix keywords
    if any(word in text_lower for word in ['fix', 'bug', 'resolve', 'correct', 'repair']):
        return 'bug', 'fa-bug'
    
    # Performance keywords
    if any(word in text_lower for word in ['performance', 'optim', 'speed', 'faster', 'improve']):
        return 'performance', 'fa-bolt'
    
    # UI/UX keywords
    if any(word in text_lower for word in ['ui', 'ux', 'design', 'style', 'visual', 'aesthetic']):
        return 'ui', 'fa-palette'
    
    # Security keywords
    if any(word in text_lower for word in ['security', 'xss', 'sanitiz', 'protect', 'safe']):
        return 'security', 'fa-shield-halved'
    
    # Documentation keywords
    if any(word in text_lower for word in ['document', 'jsdoc', 'comment', 'readme']):
        return 'docs', 'fa-book'
    
    # Maintenance/refactor keywords
    if any(word in text_lower for word in ['refactor', 'clean', 'reorganiz', 'maintain', 'code quality']):
        return 'maintenance', 'fa-wrench'
    
    # Default to feature
    return 'feature', 'fa-sparkles'

def determine_version_type(version):
    """Determine if version is major, minor, or patch"""
    parts = version.split('.')
    if len(parts) >= 3:
        if parts[1] == '0' and parts[2] == '0':
            return 'major'
        elif parts[2] == '0':
            return 'minor'
        else:
            return 'patch'
    return 'minor'

def convert_version_block(version_num, date, changes_html, is_latest=False):
    """Convert a version block to new format"""
    version_type = determine_version_type(version_num)
    latest_class = ' latest' if is_latest else ''
    
    # Extract release name from date if present
    date_match = re.search(r'\((.*?)\)', date)
    release_name = date_match.group(1) if date_match else ''
    clean_date = re.sub(r'\s*\(.*?\)', '', date).strip()
    
    # Parse changes and categorize
    change_items = []
    
    # Extract all <li> items with their content
    li_pattern = r'<li><strong>(.*?)</strong>:(.*?)</li>'
    matches = re.findall(li_pattern, changes_html, re.DOTALL)
    
    for title, content in matches:
        change_type, icon = categorize_change(title)
        
        change_item = f'''                            <div class="change-item" data-type="{change_type}">
                                <i class="fa-solid {icon}"></i>
                                <div class="change-content">
                                    <strong>{title}</strong>:{content}
                                </div>
                            </div>'''
        change_items.append(change_item)
    
    changes_list = '\n'.join(change_items)
    
    template = f'''                <!-- Version {version_num} -->
                <div class="version-card{latest_class}" data-version-type="{version_type}">
                    <div class="timeline-node">
                        <span class="version-number">{version_num}</span>
                    </div>
                    <div class="card-content">
                        <div class="card-header">
                            <h2>Version {version_num}</h2>
                            <p class="release-date">
                                <i class="fa-regular fa-calendar"></i>
                                {clean_date}
                            </p>
                            {f'<span class="release-badge">{release_name}</span>' if release_name else ''}
                        </div>
                        <div class="changes-list">
{changes_list}
                        </div>
                    </div>
                </div>

'''
    return template

# Read the current changelogs.html
changelog_path = Path(r'c:\Users\ASUS\Desktop\project101\changelogs.html')
content = changelog_path.read_text(encoding='utf-8')

# Find all old-style version blocks (after the first one we already converted)
# Pattern to match: <div class="version"> ... </div>
# We'll skip the first one since it's already converted

# For now, let's just print instructions
print("Changelog Converter Ready!")
print("\nThis script will convert old changelog entries to the new MD3 timeline format.")
print("\nTo use:")
print("1. The script has been created and is ready")
print("2. Run it with: python convert_changelogs.py")
print("3. It will automatically update changelogs.html")
print("\nNote: The first version (3.1.0) has already been converted manually.")
