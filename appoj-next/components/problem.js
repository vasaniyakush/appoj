export default function Problem() {
  return (
    <>
      <div
        id="problem-statement"
        className="_problemBody_15v7d_29 _dark_15v7d_229 print"
      >
        <h2>Problem changes</h2>
        <p>
          Tenzing received <strong>3n</strong> books from his fans. The books
          are arranged in <strong>3</strong> stacks with <strong>n</strong>{" "}
          books in each stack. Each book has a non-negative integer difficulty
          rating.
        </p>

        <p>
          Tenzing wants to read some (possibly zero) books. At first, his
          knowledge is 0 .
        </p>

        <p>
          To read the books, Tenzing will choose a non-empty stack, read the
          book on the top of the stack, and then discard the book. If Tenzing's
          knowledge is currently <strong>u</strong> , then his knowledge will
          become <strong>u|v</strong> after reading a book with difficulty
          rating <strong>v</strong>. Here | denotes the{" "}
          <strong>bitwise OR operation</strong>. Note that Tenzing can stop
          reading books whenever he wants.
        </p>

        <p>
          Tenzing's favourite number is <strong>x</strong>. Can you help Tenzing
          check if it is possible for his knowledge to become <strong>x</strong>
          ?
        </p>

        <h3>Input</h3>
        <p>
          The first line of each test case contains two integers{" "}
          <strong>n</strong> and <strong>x</strong> (1 ≤ n ≤ 10<sub>5</sub> , 0
          ≤ x ≤ 10<sub>9</sub>) — the number of books in each stack and
          Tenzing's favourite number.
        </p>

        <p>
          The second line of each test case contains <strong>n</strong> integers
          a<sub>1</sub>1,a<sub>2</sub>,…,a<sub>n</sub> (0 ≤ a<sub>i</sub> ≤ 10
          <sub>9</sub>) — the difficulty rating of the books in the first stack,
          from top to bottom.
        </p>

        <p>
          The third line of each test case contains <strong>n</strong> integers
          b<sub>1</sub>,b<sub>2</sub>,…,b<sub>n</sub> (0 ≤ b <sub>i</sub> ≤ 10
          <sub>9</sub>) — the difficulty rating of the books in the second
          stack, from top to bottom.
        </p>

        <p>
          The fourth line of each test case contains <strong>n</strong> integers
          c<sub>1</sub>,c<sub>2</sub>,…,c<sub>n</sub> (0 ≤ c<sub>i</sub> ≤ 10
          <sub>9</sub>) — the difficulty rating of the books in the third stack,
          from top to bottom.
        </p>

        <h3>Output</h3>
        <p>
          For each test case, output <code>"YES"</code> (without quotes) if
          Tenzing can make his knowledge equal to <strong>x</strong>, and{" "}
          <code>"NO"</code> (without quotes) otherwise.
        </p>

        <h3>Example Input</h3>
        <pre>
          <code>5 7 1 2 3 4 5 5 4 3 2 1 1 3 5 7 9</code>
        </pre>
        <h3>Example Output</h3>
        <pre>
          <code>YES</code>
        </pre>
        <h3>Example Input</h3>
        <pre>
          <code>5 2 3 2 3 4 5 5 4 3 2 1 3 3 5 7 9</code>
        </pre>
      </div>
    </>
  );
}
