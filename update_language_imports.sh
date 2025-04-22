
#!/bin/bash

# Find all files and replace incorrect language context imports
find ./src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i 's/import { useLanguage } from '"'"'\.\/Header'"'"'/import { useLanguage } from '"'"'@\/contexts\/LanguageContext'"'"'/g'
find ./src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i 's/import { useLanguage } from '"'"'@\/components\/Header'"'"'/import { useLanguage } from '"'"'@\/contexts\/LanguageContext'"'"'/g'
