#upload everything except public page
echo "public\npublic/*\npublic/\n.gitignore\n*/.gitignore\n*/.gitkeep\n.git-ftp-ignore\n.git-ftp-include\n.gitlab-ci.yml" > .git-ftp-ignore

git config git-ftp.url "ftp://ftp.mahdiab.ir:21/chess.mahdiab.ir"
git config git-ftp.user "mahdi@mahdiab.ir"
git config git-ftp.password "Cwe3802689*."

git ftp push
