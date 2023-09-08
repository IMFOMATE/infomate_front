export const transformNode = (node) => {
  // Modify the properties of the node as needed
  return {
    id:node.id,
    rankName: node.data.rank,
    profile: node.data.profile,
    memberCode: node.data.memberCode,
    memberName: node.text
  };
};