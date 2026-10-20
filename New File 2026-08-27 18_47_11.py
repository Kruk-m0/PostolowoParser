#26-08	02-09	09-09

import pandas as pd
import numpy as np

df = pd.read_csv("sheisse.csv")

df.to_csv("sheisse.csv", index=False)