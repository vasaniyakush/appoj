# Steps to run

1. Clone this repo.
2. Install Docker Desktop
3. If you have Apple Sillicon chip follow these two steps for Docker.
   1. https://github.com/judge0/judge0/issues/325#issuecomment-1857873210
   2. https://github.com/judge0/judge0/issues/360
4. Install node (v18 to v20)
5. Navigate to judge0 `cd judge0-v1.13.1`
6. Pull the images.
   1. `docker pull -d redis db`
   2. `docker pull -d`
7. Start Judge containers `docker-compose up -d --scale workers=2`
   - If the container already exists, delete them using `docker-compose down`
8. Navigate to appoj-next `cd appoj-next`
9. Install node dependencies `npm i`
10. Run the frontend application `npm run dev`

# Files to note

- appoj-next/constants.js - Used to specify file submission password.
- appoj-next/data/problems/problem1.js - Used to add test cases. Please add test cases as if reading from "TERMINAL". Please add output as to strictly and exactly match user output.
- appoj-next/components/problem.js - add html for problem statement here. PLEASE ADD SAMPLE TEST CASE AS THEY WOULD READ FROM TERMINAL.

```js
export const problem = [
  {
    input: `-2 5 -1
-2
2`,
    output: `3`,
  },
  {
    input: `3 -3 2 -1
34
5 3`,
    output: `21`,
  },
];
```

# DO NOT ADD TESTCASE SIMILAR TO LEETCODE.

THIS PLATFORM DOES NOT WORK THAT WAY. THIS WORKS IN NORMAL INPUT OUTPUT STYLE OF A LOCAL PROGRAM

## CORRECT WAY to show sample testcase in problem statement.

Input 1

```
-2 5 -1
-2
2
```

Output 1

```
3
```

Input 2

```
3 -3 2 -1
3
5
```

Output 2

```
21
```

## WRONG WAY

Input 1: nums = [-2,5,-1], lower = -2, upper = 2.

Output 1: 3

Input 2: nums = [3, -3, 2, -1], lower = 3, upper = 5.

Output 2: 21
