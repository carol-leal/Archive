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

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Material UI Notes

Props available to all MUI components:

- component: it allows us to change the rendered element. So a `<Button component="a">` actually shows up as a `<a>` tag instead of a `<button>` tag. If using React router you can also pass a Link component like this: `<Button component={Link}>`
- sx: it allows us to add quick styles to the elements, for example the background color of a button: `<Button sx={{bgcolor: "green"}}>`
- children

You can also pass theme stuff in this way: `<Button sx={{borderColor: (theme) => theme.typography.h1.color}}>` and this way `<Button sx={{borderColor: "h1.color"}}>`

To modify all children of an item, for example:

```
<Menu
open={open}
onClose={handleClose}
sx={{"& .MuiMenu-paper":{
bgcolor: "red
}}}
>
<MenuItem>
<MenuItem>
<MenuItem>
</Menu>
```

If we import styled, we can make it apply to all of the Buttons, for example.

```
import {styled} from '@mui/material/styles'

export const MyStyledButton = styled(Button)({
    color: "red",
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 8
})

export const MyStyledButton = styled(Button)(({theme}) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main
}))

export default function BasicButtons() {
    return (
        <MyStyledButton>I'm Styled</MyStyledButton>
    )
}
```

And also make it dynamic:

```
import {styled} from '@mui/material/styles'

 const MyReusableComponent = props => {
    return (
        <Button sx={{
            color: props.color,
            bgcolor: props.color === "#FFF" ? "#000" : "blue"
            }}>
            {props.children}
            </Button >
    )
 }

export default function BasicButtons() {
    return (
        <MyReusableComponent>I'm Styled</MyReusableComponent>
    )
}
```

We can also create a "class":

```
const blueTextClass = {
    color: "blue",
    bgcolor: "red"
}

export default function BasicButtons() {
    return (
        //<Button sx={{...blueTextClass, ...anotherClass, textAlign: "right"}}>
        //<Button sx={{blueTextClass}}>
        <Button sx={{...blueTextClass}}>
        Classy
        </Button>
    )
}
```

We can also create an external file for that.

And also use theme from Material UI.

```
const theme = createTheme({
    typography: {
        blueTextClass: {
            color: "blue",
            bgcolor: "red",
        }
    }
})

<Button sx={{typography: "blueTextClass"}}>
```

And create a global override:

```
const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "blue",
                    bgcolor: "red",
                }
                text: {
                    color: "red",
                    bgcolor: "blue",
                }
            }
        }
    }
})

<Button>
```
