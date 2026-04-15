import http.server
import socketserver
import threading
import os

base_dir = r"d:\Student Assignments\student_protfolios\Sandya_F1c"

demos = [
    ("healthcare-portal-demo", 5174),
    ("compliance-dashboard-demo", 5175),
    ("ecommerce-portal-demo", 5176),
    ("insurance-claims-demo", 5177),
    ("loan-origination-demo", 5178),
]

def serve_demo(folder, port):
    os.chdir(os.path.join(base_dir, folder, "dist"))
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"Serving {folder} at http://localhost:{port}")
        httpd.serve_forever()

threads = []
for folder, port in demos:
    t = threading.Thread(target=serve_demo, args=(folder, port), daemon=True)
    t.start()
    threads.append(t)

print("All demo servers started. Press Ctrl+C to stop.")
try:
    while True:
        pass
except KeyboardInterrupt:
    print("Shutting down.")
