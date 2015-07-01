if has('python')
python << EOF
import os, vim
items = set(os.listdir('.'))
items -= {'.git', 'lib'}
vim.command('nnoremap <leader>k :silent !git difftool -d ' + ' '.join(items) + ' -d &<CR>')
EOF
endif
