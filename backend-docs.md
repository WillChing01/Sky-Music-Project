All the /api/profile routes are protected

Any fetch request from the front end in a component should include code like this:

```javascript
const { user } = useAuthContext();

...

await fetch('/api/profile/<something>', {
    headers: {
        'Authorization': `Bearer ${user.token}`
    }
});
```