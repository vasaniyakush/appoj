export  async function GET(req, res) {
    // Your API logic here
    // const res = await fetch("Input.txt")
    res.status(200).json({ message: 'Hello from the API!' });
  };