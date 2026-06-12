const axios = require('axios');
async function test() {
  try {
    const res = await axios.post('https://petric.in/api/user/sendOtp', { mobileNo: '9999999999' });
    const verify = await axios.post('https://petric.in/api/user/verifyOtp', { mobileNo: '9999999999', otp: '1234', type: 'user' });
    const token = verify.data.token;
    console.log("Token:", token ? "Found" : "Not Found");
    if(!token) return;
    
    const endpoints = ['booking', 'booking/list', 'booking/user', 'booking/history', 'booking/my-bookings', 'booking/all'];
    for(const ep of endpoints) {
      try {
        const r = await axios.get('https://petric.in/api/' + ep, { headers: { Authorization: token } });
        console.log("Success for", ep, r.data.type, Object.keys(r.data));
      } catch(e) {
        console.log("Failed for", ep, e.response?.status);
      }
    }
  } catch(e) {
    console.log("Error:", e.message, e.response?.data);
  }
}
test();
