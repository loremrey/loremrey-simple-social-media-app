'use client';
import { EditorContent, JSONContent, useEditor, type Editor } from '@tiptap/react';
import { Button } from '../ui/button';
import StarterKit from '@tiptap/starter-kit';

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-5 mt-5">
			<Button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'secondary'}>
				H1
			</Button>
			<Button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'secondary'}>
				H2
			</Button>
			<Button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'secondary'}>
				H3
			</Button>
			<Button type="button" onClick={() => editor.chain().focus().toggleBold().run()} variant={editor.isActive('bold') ? 'default' : 'secondary'}>
				Bold
			</Button>
			<Button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} variant={editor.isActive('italic') ? 'default' : 'secondary'}>
				Italic
			</Button>{' '}
			<Button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} variant={editor.isActive('strike') ? 'default' : 'secondary'}>
				Strike
			</Button>
		</div>
	);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TiptapEditor({ setJson, json }: { setJson: any; json: JSONContent | null }) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: json ?? '<p>Hello world</p>',
		editorProps: {
			attributes: {
				class: 'prose',
			},
		},
		onUpdate: ({ editor }) => {
			const json = editor.getJSON();
			setJson(json);
		},
	});

	return (
		<div>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} className="rounded-lg border p-2 min-h-[150px] mt-2" />
		</div>
	);
}
