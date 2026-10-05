import os
import zipfile

def make_clean_zip(output_filename="CashFlow_Chain.zip"):
    exclude_dirs = {"node_modules", ".venv", "__pycache__", ".git", ".system_generated"}
    exclude_exts = {".pyc", ".pyo"}

    base_dir = os.path.abspath(".")
    print(f"Creating clean archive {output_filename} from {base_dir}...")

    file_count = 0
    with zipfile.ZipFile(output_filename, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(base_dir):
            # Prune excluded directories in-place
            dirs[:] = [d for d in dirs if d not in exclude_dirs]

            for file in files:
                if file == output_filename or file.endswith(".tmp") or file.endswith(".exe"):
                    continue
                _, ext = os.path.splitext(file)
                if ext in exclude_exts:
                    continue

                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, base_dir)
                zipf.write(full_path, rel_path)
                file_count += 1

    size_mb = os.path.getsize(output_filename) / (1024 * 1024)
    print(f"Successfully archived {file_count} files into {output_filename} ({size_mb:.2f} MB)")

if __name__ == "__main__":
    make_clean_zip()
