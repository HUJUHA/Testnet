#check if chaindata folder exists.
chaindata_dir = 'chaindata'
if not os.path.exists(chaindata_dir):
  #make chaindata dir
  os.mkdir(chaindata_dir)
  #check if dir is empty from just creation, or empty before
if os.listdir(chaindata_dir) == []:
  #create first block
  first_block = create_first_block()
  first_block.self_save()

def create_first_block():
  # index zero and arbitrary previous hash
  block_data = {}
  block_data['index'] = 0
  block_data['timestamp'] = date.datetime.now()
  block_data['data'] = 'First block data'
  block_data['prev_hash'] = None
  block = Block(block_data)
  return block

class Block(object):
  def __init__(self, dictionary):
  '''
    We're looking for index, timestamp, data, prev_hash, nonce
  '''
  for k, v in dictionary.items():
    setattr(self, k, v)
  if not hasattr(self, 'hash'): #in creating the first block, needs to be removed in future
    self.hash = self.create_self_hash()

  def __dict__(self):
    info = {}
    info['index'] = str(self.index)
    info['timestamp'] = str(self.timestamp)
    info['prev_hash'] = str(self.prev_hash)
    info['hash'] = str(self.hash)
    info['data'] = str(self.data)
    return info
