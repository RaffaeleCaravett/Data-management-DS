import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/home',
    home: true,
  },
  {
    title: 'Forniture',
    icon: 'clipboard-outline',
    link: '/forniture',
  },
  {
    title: 'Bollette',
    icon: 'folder-outline',
    link: '/bollette',
  },
  {
    title: 'Servizi',
    icon: 'settings-2-outline',
    link: '/servizi',
    children: [
      {
        title: 'Auto lettura',
        link: '/servizi/autolettura',
      },
      {
        title: 'Modifica indirizzo',
        link: '/servizi/editIndirizzo',
      },
      {
        title: 'Modifica potenza',
        link: '/servizi/editPotenza',
      },
]},
{
  title: 'Contratti ',
    icon: 'book-outline',
    link: '/contratti',
}
];
