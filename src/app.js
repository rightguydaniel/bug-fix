import FileTree from './fileTree';

export function createFileTree(input) {
  const fileTree = new FileTree();

  let parentArray = []
  let childArray = []

    for(let a = 0; a < input.length; a++){
        if(input[a].parentId){
            childArray.push(input[a])
        }else{
            parentArray.push(input[a])
        }
    }
    while(childArray.length >0){
        for(let b = 0; b < childArray.length; b++){
            if(parentArray.at(-1).id === childArray[b].parentId){
                parentArray.push(childArray[b])
                childArray.splice(b, 1)
            }
        }
    }

  input = parentArray

  for (const inputNode of input) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}