import json

# Load the Lighthouse report
with open(r'C:\Users\Asus\OneDrive\Desktop\Proyectos\entre-lineas\lighthouse-report.json', 'r', encoding='utf-8') as f:
    report = json.load(f)

audits = report.get('audits', {})

# Helper to print audit details
def print_audit(key, label):
    audit = audits.get(key)
    if not audit:
        print(f"\n=== {label} ===")
        print("NOT FOUND")
        return
    print(f"\n=== {label} ===")
    print(f"Score: {audit.get('score')}")
    print(f"Display Value: {audit.get('displayValue')}")
    details = audit.get('details', {})
    if details:
        print(f"Details Type: {details.get('type')}")
        if 'items' in details:
            for i, item in enumerate(details['items']):
                print(f"\n  Item {i+1}:")
                for k, v in item.items():
                    if isinstance(v, (str, int, float)):
                        print(f"    {k}: {v}")
                    elif isinstance(v, list):
                        print(f"    {k}: {v[:5] if len(v) > 5 else v}...")
                    elif isinstance(v, dict):
                        print(f"    {k}: {str(v)[:200]}...")
        elif 'overallSavingsMs' in details:
            print(f"Overall Savings: {details['overallSavingsMs']} ms")
        elif 'overallSavingsBytes' in details:
            print(f"Overall Savings: {details['overallSavingsBytes']} bytes")

# 1. Render-blocking resources
print_audit('render-blocking-insight', 'RENDER-BLOCKING RESOURCES')

# 2. Unused JavaScript
print_audit('unused-javascript', 'UNUSED JAVASCRIPT')

# 3. Unoptimized images
print_audit('uses-optimized-images', 'UNOPTIMIZED IMAGES')

# 4. Main thread work breakdown
print_audit('mainthread-work-breakdown', 'MAIN THREAD WORK BREAKDOWN')

# 5. Third-party impact
print_audit('third-parties-insight', 'THIRD-PARTY IMPACT')

# 6. LCP element
print_audit('largest-contentful-paint-element', 'LCP ELEMENT')

# 7. Bootup time
print_audit('bootup-time', 'BOOTUP TIME')

# 8. LCP breakdown
print_audit('lcp-breakdown-insight', 'LCP PHASE BREAKDOWN')

# 9. Long tasks
print_audit('long-tasks', 'LONG TASKS')

# Also print all available audit keys for reference
print("\n\n=== ALL AVAILABLE AUDIT KEYS ===")
for key in sorted(audits.keys()):
    print(f"  {key}")