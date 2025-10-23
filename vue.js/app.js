const { createApp } = Vue;

createApp({
    data() {
        return {
            currentView: 'lessons',
            lessons: [],
            cartItems: [],
            orders: [],
            searchQuery: '',
            sortBy: 'subject',
            sortOrder: 'asc',
            orderForm: {
                name: '',
                phone: ''
            },
            apiBaseUrl: 'https://your-api-url.com/api' // Update this with your deployed API URL
        }
    },
    computed: {
        filteredAndSortedLessons() {
            let filtered = this.lessons;
            
            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(lesson => 
                    lesson.subject.toLowerCase().includes(query) ||
                    lesson.location.toLowerCase().includes(query)
                );
            }
            
            // Sort lessons
            filtered.sort((a, b) => {
                let aValue = a[this.sortBy];
                let bValue = b[this.sortBy];
                
                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }
                
                if (this.sortOrder === 'asc') {
                    return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
                } else {
                    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
                }
            });
            
            return filtered;
        },
        cartTotal() {
            return this.cartItems.reduce((total, item) => total + item.price, 0);
        }
    },
    methods: {
        async fetchLessons() {
            try {
                const response = await fetch(`${this.apiBaseUrl}/lessons`);
                if (response.ok) {
                    this.lessons = await response.json();
                } else {
                    console.error('Failed to fetch lessons');
                    // Fallback to mock data for development
                    this.loadMockData();
                }
            } catch (error) {
                console.error('Error fetching lessons:', error);
                // Fallback to mock data for development
                this.loadMockData();
            }
        },
        
        async fetchOrders() {
            try {
                const response = await fetch(`${this.apiBaseUrl}/orders`);
                if (response.ok) {
                    this.orders = await response.json();
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        
        addToCart(lesson) {
            if (lesson.availability > 0) {
                // Check if lesson is already in cart
                const existingItem = this.cartItems.find(item => item._id === lesson._id);
                if (!existingItem) {
                    this.cartItems.push({ ...lesson });
                    // Decrease availability in the lessons array
                    const lessonIndex = this.lessons.findIndex(l => l._id === lesson._id);
                    if (lessonIndex !== -1) {
                        this.lessons[lessonIndex].availability--;
                    }
                }
            }
        },
        
        removeFromCart(lessonId) {
            const itemIndex = this.cartItems.findIndex(item => item._id === lessonId);
            if (itemIndex !== -1) {
                // Increase availability back in lessons array
                const lessonIndex = this.lessons.findIndex(l => l._id === lessonId);
                if (lessonIndex !== -1) {
                    this.lessons[lessonIndex].availability++;
                }
                this.cartItems.splice(itemIndex, 1);
            }
        },
        
        async checkout() {
            if (this.cartItems.length === 0) return;
            
            const orderData = {
                name: this.orderForm.name,
                phone: this.orderForm.phone,
                lessons: this.cartItems.map(item => ({
                    _id: item._id,
                    subject: item.subject,
                    location: item.location,
                    price: item.price
                })),
                total: this.cartTotal
            };
            
            try {
                const response = await fetch(`${this.apiBaseUrl}/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });
                
                if (response.ok) {
                    const newOrder = await response.json();
                    this.orders.unshift(newOrder);
                    
                    // Update lesson availability on server
                    for (const item of this.cartItems) {
                        await this.updateLessonAvailability(item._id, -1);
                    }
                    
                    // Clear cart and form
                    this.cartItems = [];
                    this.orderForm.name = '';
                    this.orderForm.phone = '';
                    
                    alert('Order placed successfully!');
                    this.currentView = 'orders';
                } else {
                    alert('Failed to place order. Please try again.');
                }
            } catch (error) {
                console.error('Error placing order:', error);
                alert('Error placing order. Please try again.');
            }
        },
        
        async updateLessonAvailability(lessonId, change) {
            try {
                await fetch(`${this.apiBaseUrl}/lessons/${lessonId}/availability`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ change })
                });
            } catch (error) {
                console.error('Error updating lesson availability:', error);
            }
        },
        
        loadMockData() {
            // Mock data for development/testing - 10 lessons with at least 5 spaces each
            this.lessons = [
                {
                    _id: '1',
                    subject: 'Mathematics',
                    location: 'London',
                    price: 25,
                    availability: 5
                },
                {
                    _id: '2',
                    subject: 'English',
                    location: 'Manchester',
                    price: 20,
                    availability: 5
                },
                {
                    _id: '3',
                    subject: 'Science',
                    location: 'Birmingham',
                    price: 30,
                    availability: 8
                },
                {
                    _id: '4',
                    subject: 'History',
                    location: 'Liverpool',
                    price: 22,
                    availability: 5
                },
                {
                    _id: '5',
                    subject: 'Geography',
                    location: 'Leeds',
                    price: 18,
                    availability: 6
                },
                {
                    _id: '6',
                    subject: 'Art',
                    location: 'Bristol',
                    price: 28,
                    availability: 5
                },
                {
                    _id: '7',
                    subject: 'Music',
                    location: 'Edinburgh',
                    price: 35,
                    availability: 5
                },
                {
                    _id: '8',
                    subject: 'Physics',
                    location: 'Glasgow',
                    price: 32,
                    availability: 7
                },
                {
                    _id: '9',
                    subject: 'Chemistry',
                    location: 'Cardiff',
                    price: 29,
                    availability: 5
                },
                {
                    _id: '10',
                    subject: 'Biology',
                    location: 'Belfast',
                    price: 27,
                    availability: 5
                }
            ];
        }
    },
    
    mounted() {
        this.fetchLessons();
        this.fetchOrders();
    }
}).mount('#app');
