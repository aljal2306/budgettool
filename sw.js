// sw.js - The Background Notification Catcher

// 1. Listen for incoming Push Events
self.addEventListener('push', function(event) {
    // Parse the data sent from Supabase
    const data = event.data ? event.data.json() : {};
    
    const title = data.title || 'Finance Alert';
    const options = {
        body: data.body || 'You have a bill due soon.',
        icon: '/icon.png', // You can add a small logo to your public folder later
        badge: '/badge.png', // A small monochrome icon for Android status bar
        data: data.url || '/' // This tells it where to go when you click it
    };

    // Show the notification
    event.waitUntil(self.registration.showNotification(title, options));
});

// 2. What happens when the user clicks the notification?
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Close the popup
    
    // Open the app or focus the tab if it's already open
    event.waitUntil(
        clients.openWindow(event.notification.data)
    );
});
