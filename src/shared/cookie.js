import Cookies from 'universal-cookie';

export const cookies = new Cookies();
export const token = cookies.get('mytoken');
// cookies.set('myCat', 'Pacman', { path: '/' });
// console.log(cookies.get('myCat')); // Pacman
