cd ./dist
git init
git add .
git commit -m "deploy static page"

git remote add  deploy "git@e.coding.net:FINCTIVE/chord-map/chord-map-static-page.git"

git push deploy master -f