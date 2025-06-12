import logging
from flask import Flask, jsonify, request, abort, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__, static_folder='../EasyToGet/build/static', static_url_path='/static')
# Allow CORS from any origin for development purposes
CORS(app, resources={r"/*": {"origins": "*"}})

# React build directory path
react_build_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../EasyToGet/build'))

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
logger = logging.getLogger(__name__)

# Configure SQLite database with environment variable support
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.environ.get('DATABASE_URL', 'sqlite:///' + os.path.join(basedir, 'easytoget.db'))
app.config['SQLALCHEMY_DATABASE_URI'] = db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from datetime import datetime

class Content(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    url = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    __table_args__ = (db.UniqueConstraint('title', 'url', name='uix_title_url'),)

def init_db():
    db.create_all()
    initial_data = [
        { "id": 1, "title": "Kali Linux", "content": "Official Kali Linux website for penetration testing and security auditing.", "url": "https://www.kali.org/get-kali/#kali-platforms", "category": "Operating Systems" },
        { "id": 2, "title": "Ubuntu Linux", "content": "Official Ubuntu Linux website for general purpose operating system.", "url": "https://ubuntu.com/#download-ubuntu", "category": "Operating Systems" },
        { "id": 3, "title": "Garuda Linux", "content": "official Garuda Linux download URL directly","url": "https://garudalinux.org/editions", "category": "Operating Systems"},
        { "id": 4, "title": "Parrot Linux", "content": "Official Parrot Linux website.", "url": "https://parrotsec.org/download/", "category": "Operating Systems"},
        { "id": 5, "title": "Blackarch Linux", "content": "Official Blackarch linux download", "url": "https://blackarch.org/downloads.html", "category": "Operating Systems"},
        { "id": 6, "title": "WhatsApp", "content": "Official WhatsApp download", "url": "https://www.whatsapp.com/download", "category": "Software Categories"},
        { "id": 7, "title": "VsCode", "content": "Official Download Visual Studio Code", "url": "https://code.visualstudio.com/Download", "category": "Development"},
        { "id": 8, "title": "Brave Browser", "content": "Official Brave Browser download", "url": "https://brave.com/", "category": "Software Categories"},
        { "id": 9, "title": "DigiLocker", "content": "Official gov website", "url": "https://www.digilocker.gov.in/", "category": "Software Categories"},
        { "id": 10,"title": "Windows 11", "content": "Windows 11 Official download link", "url": "https://www.microsoft.com/en-us/software-download/windows11", "category": "Operating Systems"},
        { "id": 11,"title": "Windows 10", "content": "Windows 10 Official download link", "url": "https://www.microsoft.com/en-us/software-download/windows10ISO", "category": "Operating Systems"},
        { "id": 12,"title": "Vlc player", "content": "Official download link of Vlc player", "url": "https://www.videolan.org/vlc/", "category": "Multimedia"},
        { "id": 13,"title": "Vmware", "content": "Official vmware workstation download link", "url": "https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion", "category": "Software Categories"},
        { "id": 14,"title": "VirtualBox", "content": "Official VirtualBox download link", "url": "https://www.virtualbox.org/wiki/Downloads", "category": "Software Categories"},
        { "id": 15,"title": "Zoom", "content": "Official Zoom download link", "url": "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060928", "category": "Multimedia"},
        { "id": 16,"title": "Excel", "content": "Official Microsoft Excel download link", "url": "https://microsoft-excel.en.softonic.com/", "category": "Software Categories"},
        { "id": 17,"title": "Chrome", "content": "Official Google Chrome download link", "url": "https://www.google.com/intl/en_in/chrome/", "category": "Software Categories"},
        { "id": 18,"title": "Gmail", "content": "Official Gmail download link", "url": "https://play.google.com/store/apps/details?id=com.google.android.gm&hl=en_IN", "category": "Software Categories"},
        { "id": 19,"title": "All Linux Distributions", "content": "Official All Linux download link", "url": "https://www.linux.org/pages/download/", "category": "Operating Systems"},
        { "id": 20,"title": "Adobe Photoshop", "content": "Official Adobe Photoshop download", "url": "https://www.adobe.com/products/photoshop.html", "category": "Graphic Design"},
        { "id": 21,"title": "GIMP", "content": "Official GIMP download", "url": "https://www.gimp.org/downloads/", "category": "Graphic Design"},
        { "id": 23,"title": "Visual Studio", "content": "Official Visual Studio download", "url": "https://visualstudio.microsoft.com/downloads/", "category": "Development"},
        { "id": 24,"title": "PyCharm", "content": "Official PyCharm download", "url": "https://www.jetbrains.com/pycharm/download/", "category": "Software Categories"},
        { "id": 25,"title": "Norton Antivirus", "content": "Official Norton Antivirus download", "url": "https://us.norton.com/products", "category": "Antivirus"},
        { "id": 26,"title": "McAfee Antivirus", "content": "Official McAfee Antivirus download", "url": "https://www.mcafee.com/en-us/antivirus.html", "category": "Antivirus"},
        { "id": 27,"title": "Avast Antivirus", "content": "Official Avast Antivirus download", "url": "https://www.avast.com/en-us/index#pc", "category": "Antivirus"},
        { "id": 28,"title": "Bitdefender Antivirus", "content": "Official Bitdefender Antivirus download", "url": "https://www.bitdefender.com/solutions/antivirus.html", "category": "Antivirus"},
        { "id": 29,"title": "Kaspersky Antivirus", "content": "Official Kaspersky Antivirus download", "url": "https://www.kaspersky.com/downloads", "category": "Antivirus"},
        { "id": 30,"title": "Trend Micro Antivirus", "content": "Official Trend Micro Antivirus download", "url": "https://www.trendmicro.com/en_us/forHome/products/antivirus-plus.html", "category": "Antivirus"},
        { "id": 31,"title": "Slack", "content": "Official Slack download", "url": "https://slack.com/downloads/", "category": "Communication"},
        { "id": 32,"title": "Discord", "content": "Official Discord download", "url": "https://discord.com/download", "category": "Communication"},
        { "id": 33,"title": "Spotify", "content": "Official Spotify download", "url": "https://www.spotify.com/download", "category": "Multimedia"},
        { "id": 34,"title": "Skype", "content": "Official Skype download", "url": "https://www.skype.com/en/get-skype/", "category": "Communication"},
        { "id": 35,"title": "Google Drive", "content": "Official Google Drive download", "url": "https://www.google.com/drive/download/", "category": "Cloud Storage"},
        { "id": 36,"title": "Dropbox", "content": "Official Dropbox download", "url": "https://www.dropbox.com/install", "category": "Cloud Storage"},
        { "id": 37,"title": "OneDrive", "content": "Official OneDrive download", "url": "https://onedrive.live.com/about/en-us/download/", "category": "Cloud Storage"},
        { "id": 38,"title": "Notepad++", "content": "Official Notepad++ download", "url": "https://notepad-plus-plus.org/downloads/", "category": "Development"},
        { "id": 39,"title": "Git", "content": "Official Git download", "url": "https://git-scm.com/downloads", "category": "Development"},
        { "id": 40,"title": "FileZilla", "content": "Official FileZilla download", "url": "https://filezilla-project.org/download.php", "category": "Development"},
        { "id": 41,"title": "7-Zip", "content": "Official 7-Zip download", "url": "https://www.7-zip.org/download.html", "category": "Utilities"},
        { "id": 42,"title": "WinRAR", "content": "Official WinRAR download", "url": "https://www.win-rar.com/download.html", "category": "Utilities"},
        { "id": 43,"title": "CCleaner", "content": "Official CCleaner download", "url": "https://www.ccleaner.com/ccleaner/download", "category": "Utilities"},
        { "id": 44,"title": "TeamViewer", "content": "Official TeamViewer download", "url": "https://www.teamviewer.com/en/download/", "category": "Remote Access"},
        { "id": 45,"title": "Adobe Acrobat Reader", "content": "Official Adobe Acrobat Reader download", "url": "https://get.adobe.com/reader/", "category": "Utilities"},
        { "id": 46,"title": "Google Chrome", "content": "Official Google Chrome download", "url": "https://www.google.com/chrome/", "category": "Software Categories"},
        { "id": 47,"title": "Mozilla Firefox", "content": "Official Mozilla Firefox download", "url": "https://www.mozilla.org/firefox/new/", "category": "Software Categories"},
        { "id": 48,"title": "Opera Browser", "content": "Official Opera Browser download", "url": "https://www.opera.com/download", "category": "Software Categories"},
        { "id": 49,"title": "Amanda", "content": "Official Amanda backup software download", "url": "https://www.amanda.org/download/", "category": "Backup Softwares"},
        { "id": 50,"title": "Attic", "content": "Official Attic backup software download", "url": "https://attic-backup.org/download/", "category": "Backup Softwares"},
        { "id": 51,"title": "BackupPC", "content": "Official BackupPC backup software download", "url": "https://backuppc.github.io/backuppc/download.html", "category": "Backup Softwares"},
        { "id": 52,"title": "Back In Time", "content": "Official Back In Time backup software download", "url": "https://bitbucket.org/bitteam/backintime/downloads/", "category": "Backup Softwares"},
        { "id": 53,"title": "Bacula", "content": "Official Bacula backup software download", "url": "https://www.bacula.org/downloads/", "category": "Backup Softwares"},
        { "id": 54,"title": "BorgBackup", "content": "Official BorgBackup backup software download", "url": "https://borgbackup.readthedocs.io/en/stable/installation.html", "category": "Backup Softwares"},
        { "id": 55,"title": "Box Backup", "content": "Official Box Backup software download", "url": "https://boxbackup.org/download/", "category": "Backup Softwares"},
        { "id": 56,"title": "Bup", "content": "Official Bup backup software download", "url": "https://github.com/bup/bup/releases", "category": "Backup Softwares"},
        { "id": 57,"title": "DAR", "content": "Official DAR backup software download", "url": "https://dar.linux.free.fr/download.html", "category": "Backup Softwares"},
        { "id": 58,"title": "DirSync Pro", "content": "Official DirSync Pro backup software download", "url": "https://sourceforge.net/projects/dirsyncpro/files/", "category": "Backup Softwares"},
        { "id": 59,"title": "Duplicati", "content": "Official Duplicati backup software download", "url": "https://www.duplicati.com/download", "category": "Backup Softwares"},
        { "id": 60,"title": "duplicity", "content": "Official duplicity backup software download", "url": "http://duplicity.nongnu.org/", "category": "Backup Softwares"},
        { "id": 61,"title": "FlyBack", "content": "Official FlyBack backup software download", "url": "https://github.com/aferrero2707/flyback/releases", "category": "Backup Softwares"},
        { "id": 62,"title": "FreeFileSync", "content": "Official FreeFileSync backup software download", "url": "https://freefilesync.org/download.php", "category": "Backup Softwares"},
        { "id": 63,"title": "git-annex", "content": "Official git-annex backup software download", "url": "https://git-annex.branchable.com/install/", "category": "Backup Softwares"},
        { "id": 64,"title": "luckyBackup", "content": "Official luckyBackup backup software download", "url": "https://luckybackup.sourceforge.io/download.php", "category": "Backup Softwares"},
        { "id": 65,"title": "Proxmox Backup Server", "content": "Official Proxmox Backup Server software download", "url": "https://www.proxmox.com/en/downloads/category/backup-server", "category": "Backup Softwares"},
        { "id": 66,"title": "Restic", "content": "Official Restic backup software download", "url": "https://restic.net/releases/", "category": "Backup Softwares"},
        { "id": 67,"title": "rdiff-backup", "content": "Official rdiff-backup software download", "url": "https://rdiff-backup.net/download.html", "category": "Backup Softwares"},
    ]
        
    for item in initial_data:
        existing = Content.query.filter_by(title=item['title'], url=item['url']).first()
        if not existing:
            existing_by_id = Content.query.filter_by(id=item['id']).first()
            if existing_by_id:
                existing_by_id.title = item['title']
                existing_by_id.content = item['content']
                existing_by_id.url = item['url']
                existing_by_id.category = item['category']
                existing_by_id.created_at = datetime.utcnow()
            else:
                content = Content(title=item['title'], content=item['content'], url=item['url'], category=item['category'], created_at=datetime.utcnow())
                db.session.add(content)
        else:
            existing.title = item['title']
            existing.content = item['content']
            existing.url = item['url']
            existing.category = item['category']
            existing.created_at = datetime.utcnow()
    db.session.commit()

from sqlalchemy import func

@app.route('/content/category/<string:category_name>', methods=['GET'])
def get_content_by_category(category_name):
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=10, type=int)
    # Replace hyphens with spaces and do case-insensitive match
    category_name_normalized = category_name.replace('-', ' ')
    contents = Content.query.filter(func.lower(Content.category) == func.lower(category_name_normalized)).paginate(page=page, per_page=per_page, error_out=False)
    data = [{"id": c.id, "title": c.title, "content": c.content, "url": c.url, "category": c.category, "timestamp": c.created_at.isoformat()} for c in contents.items]
    next_page = None
    if contents.has_next:
        next_page = f"/content/category/{category_name}?page={contents.next_num}&per_page={per_page}"
    return jsonify({
        "success": True,
        "category": category_name,
        "page": page,
        "per_page": per_page,
        "total": contents.total,
        "pages": contents.pages,
        "next_page": next_page,
        "data": data
    })

@app.route('/content/category/<string:category_name>', methods=['POST'])
def add_content_to_category(category_name):
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "JSON body required"}), 400
    title = data.get('title')
    content_text = data.get('content')
    url = data.get('url')
    if not title or not content_text or not url:
        return jsonify({"success": False, "message": "title, content, and url are required"}), 400
    new_content = Content(title=title, content=content_text, url=url, category=category_name)
    db.session.add(new_content)
    db.session.commit()
    return jsonify({"success": True, "message": f"Content added to category {category_name}", "content": {
        "id": new_content.id,
        "title": new_content.title,
        "content": new_content.content,
        "url": new_content.url,
        "category": new_content.category
    }})

@app.before_request
def log_request_info():
    logger.info(f"Request: {request.method} {request.path} - Args: {request.args}")

@app.route('/')
def serve_react_app():
    return send_from_directory(react_build_dir, 'index.html')

@app.route('/<path:path>')
def serve_react_files(path):
    # Serve static files if they exist, else serve index.html for React Router
    file_path = os.path.join(react_build_dir, path)
    if os.path.exists(file_path):
        return send_from_directory(react_build_dir, path)
    else:
        return send_from_directory(react_build_dir, 'index.html')

@app.route('/api-docs')
def api_docs():
    return """
    <html>
      <head>
        <title>EasyToGet API Documentation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f0f4ff;
            color: #003bb5;
            padding: 2rem;
          }
          h1 {
            color: #0056bff2;
          }
          ul {
            list-style-type: none;
            padding-left: 0;
          }
          li {
            margin: 1rem 0;
            font-size: 1.1rem;
          }
          code {
            background: #e0e7ff;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: monospace;
          }
          a {
            color: #003bb5;
            text-decoration: none;
            font-weight: bold;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>EasyToGet API Documentation</h1>
        <p>This page provides information about the available API endpoints.</p>
        <ul>
          <li><code>GET /content</code> - Returns all website content</li>
          <li><code>GET /content/all</code> - Returns all content without pagination</li>
          <li><code>GET /search?q=your_query</code> - Returns search results matching the query</li>
          <li><code>GET /content/category/category_name</code> - Returns content for a specific category</li>
          <li><code>GET /api-docs/json</code> - Returns API documentation in JSON format</li>
          <li><code>GET /health</code> - Returns API health status</li>
        </ul>
      </body>
    </html>
    """

@app.route('/api-docs/json')
def api_docs_json():
    return jsonify({
        "endpoints": {
            "/content": "GET - Returns all website content",
            "/content/all": "GET - Returns all content without pagination",
            "/content/category/{category_name}": "GET - Returns content for a specific category",
            "/search?q=your_query": "GET - Returns search results matching the query",
            "/health": "GET - Returns API health status"
        },
        "description": "EasyToGet backend API for website content retrieval and search"
    })

@app.route('/content')
def content():
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=10, type=int)
    contents = Content.query.paginate(page=page, per_page=per_page, error_out=False)
    data = [{"id": c.id, "title": c.title, "content": c.content, "url": c.url} for c in contents.items]
    next_page = None
    if contents.has_next:
        next_page = f"/content?page={contents.next_num}&per_page={per_page}"
    return jsonify({
        "success": True,
        "page": page,
        "per_page": per_page,
        "total": contents.total,
        "pages": contents.pages,
        "next_page": next_page,
        "data": data
    })

@app.route('/content/all')
def content_all():
    contents = Content.query.all()
    data = [{"id": c.id, "title": c.title, "content": c.content, "url": c.url, "category": c.category} for c in contents]
    return jsonify({
        "success": True,
        "total": len(data),
        "data": data
    })

@app.route('/search')
def search():
    query = request.args.get('q', '').lower()
    if not query:
        return jsonify({"success": False, "message": 'Query parameter "q" is required'}), 400
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=10, type=int)
    all_results = Content.query.filter(
        (Content.title.ilike(f"%{query}%")) |
        (Content.content.ilike(f"%{query}%")) |
        (Content.url.ilike(f"%{query}%"))
    ).all()
    # Remove duplicates by id
    unique_results_dict = {}
    for c in all_results:
        unique_results_dict[c.id] = c
    unique_results = list(unique_results_dict.values())
    total = len(unique_results)
    # Manual pagination
    start = (page - 1) * per_page
    end = start + per_page
    paginated_results = unique_results[start:end]
    logger.info(f"Search query: {query}, total unique results found: {total}")
    data = [{"id": c.id, "title": c.title, "content": c.content, "url": c.url} for c in paginated_results]
    pages = (total + per_page - 1) // per_page
    return jsonify({
        "success": True,
        "page": page,
        "per_page": per_page,
        "total": total,
        "pages": pages,
        "data": data
    })

@app.route('/health')
def health():
    return jsonify({"success": True, "message": "API is healthy"})

@app.errorhandler(404)
def not_found(e):
    logger.warning(f"404 Not Found: {request.method} {request.path}")
    return jsonify({"success": False, "message": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(e):
    logger.error(f"500 Internal Server Error: {request.method} {request.path} - {e}")
    return jsonify({"success": False, "message": "Internal server error"}), 500

@app.route('/content/update-url', methods=['PUT'])
def update_content_url():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "JSON body required"}), 400
    content_id = data.get('id')
    title = data.get('title')
    new_url = data.get('url')
    if not new_url:
        return jsonify({"success": False, "message": "New URL is required"}), 400
    query = None
    if content_id:
        query = Content.query.filter_by(id=content_id).first()
    elif title:
        query = Content.query.filter_by(title=title).first()
    else:
        return jsonify({"success": False, "message": "Either id or title must be provided"}), 400
    if not query:
        return jsonify({"success": False, "message": "Content not found"}), 404
    query.url = new_url
    db.session.commit()
    return jsonify({"success": True, "message": "URL updated successfully", "content": {
        "id": query.id,
        "title": query.title,
        "url": query.url
    }})

@app.route('/content/duplicates')
def content_duplicates():
    from sqlalchemy import func
    duplicates = db.session.query(
        Content.title,
        Content.url,
        func.count(Content.id).label('count')
    ).group_by(Content.title, Content.url).having(func.count(Content.id) > 1).all()
    duplicate_entries = []
    for title, url, count in duplicates:
        entries = Content.query.filter_by(title=title, url=url).all()
        duplicate_entries.append({
            "title": title,
            "url": url,
            "count": count,
            "entries": [{"id": e.id, "content": e.content} for e in entries]
        })
    return jsonify({
        "success": True,
        "total_duplicates": len(duplicate_entries),
        "duplicates": duplicate_entries
    })

def remove_duplicate_entries():
    from sqlalchemy import func
    duplicates = db.session.query(
        Content.url,
        func.count(Content.id).label('count')
    ).group_by(Content.url).having(func.count(Content.id) > 1).all()
    removed_count = 0
    for url, count in duplicates:
        entries = Content.query.filter_by(url=url).order_by(Content.id).all()
        # Keep the first entry, delete the rest
        for entry in entries[1:]:
            db.session.delete(entry)
            removed_count += 1
    db.session.commit()
    return removed_count

@app.route('/content/remove-duplicates', methods=['DELETE'])
def remove_duplicates():
    removed_count = remove_duplicate_entries()
    return jsonify({
        "success": True,
        "message": f"Removed {removed_count} duplicate entries."
    })

db_initialized = False

@app.before_request
def initialize_database():
    global db_initialized
    if not db_initialized:
        init_db()
        remove_duplicate_entries()
        db_initialized = True

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))  # Changed default port to 5001 to avoid conflict
    app.run(port=port, debug=True)