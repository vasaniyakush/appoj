import { IP } from "@/constants";
import { problem } from "@/data/problems/problem1";
import axios from "axios";

export async function POST(request) {
    try {
        const req = {};
        req.body = await request.json();

        if (!req.body.code || req.body.code === "") {
            const responseBody = JSON.stringify({ message: "No Code Found" });
            return new Response(responseBody, {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } else if (!req.body.lang_id || req.body.lang_id === "") {
            const responseBody = JSON.stringify({
                message: "Please send a language id",
            });
            return new Response(responseBody, {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } else {
            let allPassed = true;
            let passedCount = 0;

            for (let testProb of problem) {
                const inputTestcases = testProb.input;
                const expectedOutput = testProb.output;
                const userCode = req.body.code;

                let data = JSON.stringify({
                    source_code: userCode,
                    language_id: req.body.lang_id,
                    stdin: inputTestcases,
                    expected_output: expectedOutput,
                });

                let config = {
                    method: "post",
                    maxBodyLength: Infinity,
                    url: `${IP}/submissions/?base64_encoded=false&wait=false&cpu_time_limit=10`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: data,
                };

                const response = await axios.request(config);

                let judgement = await new Promise(function(resolve, reject) {
                    setTimeout(async function() {
                        const judgement = await axios.get(
                            `${IP}/submissions/${response.data.token}?base64_encoded=true&fields=stdout,stderr,status_id,language_id,compile_output,status,time`,
                            {
                                responseType: "arraybuffer",
                            }
                        );
                        resolve(judgement);
                    }, 2000);
                });

                let repj = await JSON.parse(
                    Buffer.from(judgement.data, "base64").toString()
                );

                while (repj.status_id === 2 || repj.status_id === 1) {
                    judgement = await new Promise(function(resolve, reject) {
                        setTimeout(async function() {
                            const judgement = await axios.get(
                                `${IP}/submissions/${response.data.token}?base64_encoded=true&fields=stdout,stderr,status_id,language_id,compile_output,status,time`,
                                {
                                    responseType: "arraybuffer",
                                }
                            );
                            resolve(judgement);
                        }, 2000);
                    });

                    repj = await JSON.parse(
                        Buffer.from(judgement.data, "base64").toString()
                    );
                }

                if (repj.status_id === 3) {
                    passedCount++;
                } else {
                    allPassed = false;
                }
            }
            console.log("Passed Count", passedCount)
            console.log("Total Count", problem.length)
            const responseBody = JSON.stringify({
                passed: allPassed,
                passedCount: passedCount,
                totalTestCases: problem.length,
            });

            return new Response(responseBody, {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    } catch (err) {
        console.log("INSIDE ERROR");
        console.log(err);
        return new Response(
            JSON.stringify({
                err: err,
            }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}



