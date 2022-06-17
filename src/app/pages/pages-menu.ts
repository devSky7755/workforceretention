import { NbMenuItem } from "@nebular/theme";

// @ts-ignore
// @ts-ignore
// @ts-ignore
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Products",
    icon: { icon: "lightbulb", pack: "nebular" },
    children: [
      {
        title: "Product Management",
        link: "products/product-management",
      },
      {
        title: "Static Pages",
        link: "products/static-pages",
      },
      {
        title: "Box Management",
        link: "products/box-management",
      },
    ],
  },
  {
    title: "Articles",
    icon: { icon: "compose", pack: "nebular" },
    children: [
      {
        title: "Articles Management",
        link: "articles/article-management",
      },
    ],
  },
  {
    title: "Clients",
    icon: { icon: "person", pack: "nebular" },
    children: [
      {
        title: "Client Selection",
        link: "clients/client-selection",
      },
    ],
  },
  {
    title: "Surveys",
    icon: { icon: "e-commerce", pack: "nebular" },
    children: [
      {
        title: "Survey Management",
        link: "surveys/survey-management",
      },
      // {
      //     title: 'Email Management',
      //     link: 'surveys/email-management',
      // },
    ],
  },
  {
    title: "Reporting",
    icon: { icon: "bar-chart", pack: "nebular" },
    children: [
      {
        title: "Data Reports",
        link: "reporting/data-reports",
      },
      {
        title: "Report Files",
        link: "reporting/report-files",
      },
    ],
  },
  // {
  //     title: 'Links',
  //     icon: 'nb-shuffle',
  //     children: [
  //         {
  //             title: 'Link Management',
  //             link: 'links/link-management',
  //         },
  //         {
  //             title: 'Category Management',
  //             link: 'links/category-management',
  //         },
  //     ],
  // },
  {
    title: "Office Admin",
    icon: { icon: "power-circled", pack: "nebular" },
    children: [
      {
        title: "User Management",
        link: "office-admin/employee-management",
      },
      {
        title: "Permission Management",
        link: "office-admin/permission-management",
      },
      {
        title: "Email Management",
        link: "office-admin/email-management",
      },
    ],
  },
];
