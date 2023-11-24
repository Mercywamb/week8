
const members = []; 


const registerMember = (req, res) => {
  const { email, cohort, firstName, lastName, ...otherFields } = req.body;

 
  const emailRegex = /^[A-Za-z]+\.[A-Za-z]+@thejitu\.com$/;
  const cohortRegex = /^\d+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!cohortRegex.test(cohort)) {
    return res.status(400).json({ error: "Invalid cohort number" });
  }

  members.push({
    email,
    cohort,
    firstName,
    lastName,
    ...otherFields,
  });

 
  return res.status(201).json({ message: "Member registered successfully" });
};


const updateMember = (req, res) => {
  const { email } = req.params;
  const { cohort, firstName, lastName, ...otherFields } = req.body;

  
  const member = members.find((m) => m.email === email);

  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }

  member.cohort = cohort;
  member.firstName = firstName;
  member.lastName = lastName;


  return res.status(200).json({ message: "Member updated successfully" });
};


const fetchMember = (req, res) => {
  const { email } = req.params;

 
  const member = members.find((m) => m.email === email);

  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }

  
  return res.status(200).json(member);
};


const deleteMember = (req, res) => {
  const { email } = req.params;


  const memberIndex = members.findIndex((m) => m.email === email);

  if (memberIndex === -1) {
    return res.status(404).json({ error: "Member not found" });
  }

  members.splice(memberIndex, 1);

 
  return res.status(200).json({ message: "Member deleted successfully" });
};


module.exports = { registerMember, updateMember, fetchMember, deleteMember };