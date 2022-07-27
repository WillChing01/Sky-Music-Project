All the /api/profile routes are protected

If you are putting out a fetch request to /api/profile/:id,
say to get the favourites playlist(s) associated with a user,
on the front end you should have code like this in your component:

```javascript
const { user } = useAuthContext();

...

await fetch('/api/profile/<the id>', {
    headers: {
        'Authorization': `Bearer ${user.token}`
    }
});

```

The token is really hard to fake. The client and the browser
have agreed that when you have access to it you're really 
the user of interest. It persists when you reload the page
in local storage, see the Dev Tools under 'Application'.