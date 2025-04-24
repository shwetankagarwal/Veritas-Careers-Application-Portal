import{j as t}from"./index-DEvgIYhV.js";const f=({children:s,variant:o="primary",size:n="md",type:a="button",className:i="",disabled:r=!1,fullWidth:c=!1,onClick:l,icon:e})=>{const u="font-medium rounded-md inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",m={primary:"bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",secondary:"bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400",outline:"bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 focus:ring-primary-500",ghost:"bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-primary-500",danger:"bg-error-600 text-white hover:bg-error-700 focus:ring-error-500"},y={sm:"text-sm px-3 py-1.5",md:"text-sm px-4 py-2",lg:"text-base px-5 py-2.5"},g=r?"opacity-50 cursor-not-allowed":"cursor-pointer",p=c?"w-full":"";return t.jsxs("button",{type:a,className:`
        ${u}
        ${m[o]}
        ${y[n]}
        ${g}
        ${p}
        ${i}
      `,disabled:r,onClick:l,children:[e&&t.jsx("span",{className:"mr-2",children:e}),s]})};export{f as B};
