# EcoRide — Guide simple (déploiement en local)

Ce projet est un site **HTML / CSS / JS**.  
On utilise **PHP uniquement** pour inclure `header.phtml` et `footer.phtml`.  
👉 **Pas de base de données.**

---

## 1) Ce qu’il faut (prérequis)
- **Apache** (serveur web)
- **PHP 8+** (pour exécuter les fichiers `.phtml`)
- **VS Code** (pour modifier les fichiers)

Vérifier sur Ubuntu/Debian :
```bash
apache2 -v
php -v
```
Installer si besoin :
```bash
sudo apt update
sudo apt install apache2 php libapache2-mod-php
```

---

## 2) Démarrage rapide (le plus simple)
1. Copie le dossier **EcoRide** dans `/var/www/html/`  
   → tu obtiens `/var/www/html/EcoRide/`
2. Dans **`/var/www/html/EcoRide/public/`**, crée un fichier **`.htaccess`** avec :
   ```
   AddType application/x-httpd-php .php .phtml
   DirectoryIndex index.phtml index.php
   ```
   > Ça indique à Apache que `.phtml` doit être exécuté par PHP.
3. Ouvre le site dans ton navigateur :  
   **http://localhost/EcoRide/public/**

> Astuce : ouvre le dossier **EcoRide** dans **VS Code** pour modifier les fichiers et rafraîchis la page pour voir le résultat.

---

## 3) Option (un peu plus technique) : VirtualHost dédié
Tu veux une adresse plus sympa comme **http://ecoride.local** ?

1. Copie le projet :  
   ```bash
   sudo mkdir -p /var/www/EcoRide
   sudo cp -r ~/www/formation.studi/EcoRide/* /var/www/EcoRide/
   sudo chown -R $USER:www-data /var/www/EcoRide
   ```
2. Crée le fichier `/etc/apache2/sites-available/ecoride.conf` avec :
   ```apache
   <VirtualHost *:80>
       ServerName ecoride.local
       DocumentRoot /var/www/EcoRide/public

       <Directory /var/www/EcoRide/public>
           AllowOverride All
           Require all granted
       </Directory>

       # Autoriser .phtml
       AddType application/x-httpd-php .php .phtml
       DirectoryIndex index.phtml index.php
   </VirtualHost>
   ```
3. Active le site et ajoute le host :
   ```bash
   sudo a2ensite ecoride
   echo "127.0.0.1 ecoride.local" | sudo tee -a /etc/hosts
   sudo systemctl reload apache2
   ```
4. Ouvre **http://ecoride.local**

---

## 4) Arborescence (où se trouvent les fichiers)

```
EcoRide/
├─ public/                          ← dossier servi par Apache
│  ├─ index.phtml
│  ├─ confidentiality.phtml
│  ├─ contact.phtml
│  ├─ covoiturage.phtml
│  ├─ detail.phtml
│  ├─ how-it-works.phtml
│  ├─ login.phtml
│  ├─ mentions.phtml
│  ├─ new-vehicule.phtml
│  ├─ profile.phtml
│  ├─ publish.phtml
│  ├─ signIn.phtml
│  ├─ includes/
│  │  ├─ header.phtml
│  │  └─ footer.phtml
│  └─ assets/
│     ├─ css/
│     │  └─ main.css
│     ├─ js/
│     │  ├─ main.js
│     │  └─ modules/
│     │     ├─ bootstrapValidation.js
│     │     ├─ how-it-works.js
│     │     ├─ profile.js
│     │     └─ swap.js
│     ├─ img/
│     │  ├─ Logo_horizontal_transparent_soft.png
│     │  ├─ Logo_vertical_transparent.png
│     │  ├─ (autres images…)
│     └─ fonts/
│        ├─ Lora-VariableFont_wght.ttf
│        └─ Merriweather-Italic-VariableFont_opsz,wdth,wght.ttf
└─ docs/
   ├─ Diagramme-cas-utilisation-EcoRide.pdf
   ├─ charte-graphique-entiere.pdf
   ├─ diagramme-de-classe.pdf
   ├─ diagramme-sequence.pdf
   └─ README.md
```


## 🧰 Git (débutant) — mon workflow simple

Branches utilisées :
- **main** : version stable (à montrer/publier)
- **developpement** : intégration (travail courant)
- **test** : branche de travail créée depuis `developpement`

### 1) Récupérer le projet
```bash
git clone <URL_DU_REPO>
cd EcoRide
```

### 2) Créer/mettre à jour la branche de travail `test`
```bash
# Se placer sur developpement (branche d'intégration)
git switch developpement || git switch -c developpement --track origin/developpement
git pull

# Créer la branche de travail
git switch -c test       # (si elle existe déjà : git switch test)
git push -u origin test  # première fois seulement
```

### 3) Sauvegarder mon code
```bash
git add -A
git commit -m "feat: mon changement"
git push
```

### 4) Intégrer le travail : `test` -> `developpement`
```bash
git switch developpement
git pull
git merge --no-ff test
git push
```

### 5) Publier une version : `developpement` -> `main`
```bash
git switch main
git pull
git merge --no-ff developpement
git push

# (optionnel) Taguer une version
git tag -a v1.0.0 -m "EcoRide — première version stable"
git push origin v1.0.0
```

> Astuces :
> - Toujours travailler sur `test`, puis intégrer dans `developpement`, puis publier sur `main`.
> - Sur GitHub, tu peux faire les merges via **Pull Request** (plus propre et plus clair).
> - Si Git dit que des fichiers ne sont pas suivis ou supprimés, utilise `git add -A` pour tout prendre (ajouts, modifs, suppressions).
