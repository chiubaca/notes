const { Octokit } = require("@octokit/rest");

if (process.env.NODE_ENV === "development") {
    require("dotenv").config()
}

const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
})

async function main() {
  try {
    const buffContent = Buffer.from("encoded content", 'utf-8');
    const contentEncoded =  buffContent.toString('base64');

    console.log("Encoded", contentEncoded);

    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: "chiubaca",
      repo: "learning",
      path: "journal/OUTPUT.md",
      message: "feat: Added OUTPUT.md programatically",
      content: contentEncoded,
      committer: {
        name: `Alex Chiu`,
        email: "alexchiu11@gmail.com",
      },
      author: {
        name: "Alex Chiu",
        email: "alexchiu11@gmail.com",
      },
    })

    console.log("created new journal", data)
  } catch (err) {
    console.error("something went wrong",err)
  }
}

main()