<div align="center">
  <img width="1511" alt="image" src="https://github.com/user-attachments/assets/bf330719-7e93-4e3f-bb62-df301aec5360">
  <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Clerk-black?style=for-the-badge&logoColor=white&logo=clerk&color=6C47FF" alt="clerk" />
    <img src="https://img.shields.io/badge/-Getstream-black?style=for-the-badge&logoColor=white&logo=streamlit&color=FF4B4B" alt="streamlit" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
	   <img src="https://img.shields.io/badge/-Shadcn_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=000000" alt="shadcnui" />
  </div>
</div>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Tech Stack

- [Nextjs 14](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Clerk](https://nextjs.org/learn) - Authentication and User management
- [Video and Audio by Stream](https://getstream.io/video/docs/react/) - Stream
- [CSS framework](https://tailwindcss.com/) - tailwindcss
- [UI component library](https://ui.shadcn.com/) - shadcn
- TypeScript

## Deploy on Vercel

[Production url](https://jozefu-zoom-clone.vercel.app/)

## More
[Detail tutorial](https://www.youtube.com/watch?v=R8CIO1DZ2b8)

## Question & Solution
- [HomeCard dynamic class names](https://tailwindcss.com/docs/content-configuration#dynamic-class-names)

  <img width="770" alt="image" src="https://github.com/user-attachments/assets/ae80a528-5639-475c-8ae9-c8a01a029fc2">

- "create a meeting" button click a lot of times 

```bash
import debounce from 'lodash.debounce';
function App() {
  ...
	const handleClick = event => {
		const debouncedSave = debounce(() => saveToDb(nextValue), 1000);
		debouncedSave();
	};
  ...
}
```

This doesn't actually work beacause debouncedSave function will recreated on each handleClick function call.
we use useCallback or useRef hook could solve this problem.

```bash
	const debouncedSave = useCallback(
		debounce(nextValue => saveToDb(nextValue), 1000),
		[], // will be created only once initially
	);
	const handleClick= event => {
		...
		// Even though handleClick is created on each render and executed
		// it references the same debouncedSave that was created initially
		debouncedSave(nextValue);
	};
```

```bash
	const debouncedSave = useRef(
		debounce(nextValue => saveToDb(nextValue), 1000)
	).current;
	const handleClick= event => {
		...
		debouncedSave(nextValue);
	};
```

