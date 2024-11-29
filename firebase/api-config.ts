export let BASE_URL = ''
if (process.env.NEXT_ENV === 'production') {
    BASE_URL = 'https://us-central1-psyched-span-426722-q0.cloudfunctions.net/real/api'
} else {
    BASE_URL = 'http://127.0.0.1:5001/psyched-span-426722-q0/us-central1/real/api'
}