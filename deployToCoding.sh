cd ./dist
git init
git add .
git commit -m "deploy static page"
# git remote add  deploy "https://e.coding.net/FINCTIVE/vue-chord-helper/chord-helper-static-page.git"
git remote add  deploy "git@e.coding.net:FINCTIVE/vue-chord-helper/chord-helper-static-page.git"

git push deploy master -f