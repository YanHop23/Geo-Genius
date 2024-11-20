export const state = {
    UsersTable: [
        {
            id: "1",
            firstName: "Олег",
            lastName: "Положевець",
            nickName: "alezhka",
            email: "o",
            age: "19",
            password: "1234"
        }
    ],
    LocationTable: [
        {
            id: '1',
            latitude: 49.84082974256015,
            longitude: 24.025651539399814,
            name: 'Добрий Друг 4',
            category: 1
        },
        {
            id: '2',
            latitude: 49.840551760786155,
            longitude: 24.032647063916702,
            name: 'Добрий Друг 5',
            category: 1
        },
        {
            id: '3',
            latitude: 49.84317703264121,
            longitude: 24.03309462213355,
            name: 'Добрий Друг 2',
            category: 2
        },
        {
            id: '4',
            latitude: 49.84313724933925,
            longitude: 24.033425874940335,
            name: 'Добрий Друг 3',
            category: 2

        }
    ],
    categoryTable: [
        {
            id: "1",
            name: "Пиво",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/761/761856.png",
        },
        {
            id: "2",
            name: "Не пиво",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/5690/5690089.png",
        },
        
    ],

    getUserById: function(id) {
        return this.UsersTable.find(user => user.id === id);
    },

    getUserByEmail: function(email) {
        return this.UsersTable.find(user => user.email === email);
    },

    validateLogin: function(email, password) {
        const user = this.getUserByEmail(email);
        if (user && user.password === password) {
            return { success: true, user };
        } else {
            return { success: false, message: 'Неправильний email або пароль' };
        }
    }
};



