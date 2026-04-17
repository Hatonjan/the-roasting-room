/* Menu Data for MenuPage */

export const menuCategories = {
  drinks: {
    title: 'Drinks',
    sections: [
      {
        id: 'hot-drinks',
        title: 'Hot Drinks',
        subsections: [
          {
            id: 'espresso-coffee',
            title: 'Espresso & Coffee',
            items: [
              {
                id: 1,
                name: 'Espresso',
                price: 3.50,
                description: 'A double shot of our house \'El Templo\' roast'
              },
              {
                id: 2,
                name: 'Americano',
                price: 4.00,
                description: ''
              },
              {
                id: 3,
                name: 'Macchiato',
                price: 3.75,
                description: ''
              },
              {
                id: 4,
                name: 'Cortado',
                price: 4.25,
                description: ''
              },
              {
                id: 5,
                name: 'Cappuccino',
                price: 4.50,
                description: ''
              },
              {
                id: 6,
                name: 'Latte',
                price: 5.00,
                description: ''
              },
              {
                id: 7,
                name: 'Mocha',
                price: 5.50,
                description: 'Made with in-house dark chocolate ganache'
              },
              {
                id: 8,
                name: 'Pour-Over',
                price: 6.00,
                description: 'Your choice of any of our featured single-origin beans'
              },
              {
                id: 9,
                name: 'French Press (for two)',
                price: 9.00,
                description: ''
              }
            ]
          },
          {
            id: 'not-coffee',
            title: 'Not Coffee',
            items: [
              {
                id: 10,
                name: 'Chai Latte',
                price: 5.25,
                description: ''
              },
              {
                id: 11,
                name: 'Matcha Latte',
                price: 5.50,
                description: ''
              },
              {
                id: 12,
                name: 'Hot Chocolate',
                price: 4.75,
                description: ''
              },
              {
                id: 13,
                name: 'Loose Leaf Tea',
                price: 3.75,
                description: 'Earl Grey, English Breakfast, Chamomile, Peppermint'
              }
            ]
          }
        ]
      },
      {
        id: 'cold-drinks',
        title: 'Cold Drinks',
        items: [
          {
            id: 14,
            name: 'Cold Brew',
            price: 4.75,
            description: ''
          },
          {
            id: 15,
            name: 'Nitro Cold Brew',
            price: 5.25,
            description: ''
          },
          {
            id: 16,
            name: 'Iced Latte',
            price: 5.00,
            description: ''
          },
          {
            id: 17,
            name: 'Iced Mocha',
            price: 5.50,
            description: ''
          },
          {
            id: 18,
            name: 'Iced Chai Latte',
            price: 5.25,
            description: ''
          },
          {
            id: 19,
            name: 'Iced Matcha Latte',
            price: 5.50,
            description: ''
          },
          {
            id: 20,
            name: 'Iced Tea',
            price: 3.75,
            description: 'Black or Hibiscus'
          }
        ]
      }
    ]
  },
  food: {
    title: 'Food & Desserts',
    subtitle: 'We source all our pastries from local bakers',
    items: [
      {
        id: 21,
        name: 'Savory Chive & Feta Scone',
        price: 4.00,
        description: ''
      },
      {
        id: 22,
        name: 'Everything Bagel',
        price: 4.50,
        description: 'Served with your choice of cream cheese or butter'
      },
      {
        id: 23,
        name: 'Avocado Toast',
        price: 9.00,
        description: 'Sourdough, fresh avocado, chili flakes, sea salt'
      },
      {
        id: 24,
        name: 'Butter Croissant',
        price: 4.00,
        description: ''
      },
      {
        id: 25,
        name: 'Chocolate Croissant',
        price: 4.50,
        description: ''
      },
      {
        id: 26,
        name: 'Almond Croissant',
        price: 4.75,
        description: ''
      },
      {
        id: 27,
        name: 'Blueberry Scone',
        price: 3.75,
        description: ''
      },
      {
        id: 28,
        name: 'Brown Butter Coffee Cake',
        price: 4.25,
        description: ''
      },
      {
        id: 29,
        name: 'Double Fudge Brownie',
        price: 4.00,
        description: ''
      },
      {
        id: 30,
        name: 'Sea Salt Chocolate Chip Cookie',
        price: 3.50,
        description: ''
      }
    ]
  }
}
