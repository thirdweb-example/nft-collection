import {
  ThirdwebNftMedia,
  useContractMetadata,
  useNFTCollection,
  useNFTs,
} from "@thirdweb-dev/react";
import styles from "../styles/Theme.module.css";

// Put Your NFT Drop Contract address from the dashboard here
const myNftCollectionAddress = "0x44cD692ded65508bD677Ed0575B933fbb32822bc";

export default function NFTCollection() {
  const nftCollection = useNFTCollection(myNftCollectionAddress);

  // Load contract metadata
  const { data: contractMetadata } = useContractMetadata(
    myNftCollectionAddress
  );

  const { data: nfts, isLoading } = useNFTs(nftCollection);

  // Loading state while we fetch the metadata
  if (!nftCollection || !contractMetadata) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.collectionContainer}>
        <div className={styles.detailPageContainer}>
          <h1>{contractMetadata?.name}</h1>

          <p>{contractMetadata?.description}</p>
        </div>

        {!isLoading ? (
          <div className={styles.nftBoxGrid}>
            {nfts?.map((nft) => (
              <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  className={styles.nftMedia}
                />
                <h3>{nft.metadata.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
