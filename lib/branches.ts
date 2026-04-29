export const branches = [
  { id: 1, name: 'Simba Kigali Central', address: 'KN 4 Avenue, Kigali', sector: 'Nyarugenge', phone: '0780 XXX XXX' },
  { id: 2, name: 'Simba Kicukiro', address: 'Kicukiro Sector, Kigali', sector: 'Kicukiro', phone: '0780 XXX XXX' },
  { id: 3, name: 'Simba Nyamirambo', address: 'Nyamirambo Sector, Kigali', sector: 'Nyarugenge', phone: '0780 XXX XXX' },
  { id: 4, name: 'Simba Remera', address: 'Remera Sector, Kigali', sector: 'Gasabo', phone: '0780 XXX XXX' },
  { id: 5, name: 'Simba Kagarama', address: 'Kagarama Sector, Kigali', sector: 'Kicukiro', phone: '0780 XXX XXX' },
  { id: 6, name: 'Simba Kanombe', address: 'Kanombe Sector, Kigali', sector: 'Kicukiro', phone: '0780 XXX XXX' },
  { id: 7, name: 'Simba Gatsata', address: 'Gatsata Sector, Kigali', sector: 'Kacyiru', phone: '0780 XXX XXX' },
  { id: 8, name: 'Simba Kimironko', address: 'Kimironko Sector, Kigali', sector: 'Gasabo', phone: '0780 XXX XXX' },
  { id: 9, name: 'Simba Ruhengeri', address: 'Ruhengeri City, Northern Province', sector: 'Musanze', phone: '0780 XXX XXX' },
] as const;

export type Branch = typeof branches[number];