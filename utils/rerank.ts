import cohere from "cohere";

const cohereRank = async (jobs, bio) => {
  const co = new cohere.Client("QhTNoHL4khLpwCk6uroho56prShnzSpzTe8uBo2b");
  const descriptions = jobs.map((job) => job.description);
  const query = `This reranking will rank the job descriptions based on the overlap of skills with the user bio. 
        The user bio contains a description of past experiences a user has that hints at skills they may have. 
        The user bio is the following: ${bio}. 
        Rank the job descriptions, from least overlap of skills to most. 
        So the first item will contain the most different set of skills than the user bio.`;

  const response = await co.rerank({
    model: "rerank-english-v2.0",
    query,
    documents: descriptions,
  });

const rerankedJobs = response.results.map((desc) =>
    jobs.find((job) => job.description === desc.document.text)
);
  return rerankedJobs;
};

export default cohereRank;