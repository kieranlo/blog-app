# Auto-encoder, Variational Auto-encoder

Date: July 10 2025

## Auto-encoder

Idea: Setting an encoder and a decoder as neural networks that create a bottleneck for data that ensures the main structure of the information can go through and be reconstructed.

![AE architecture diagram](/images/autoencoder_vae/ae_image.png)

### Training Steps:
1. **Input Processing**: The input data $x$ is fed directly into the encoder network
2. **Encoding**: The encoder $e_\theta(x)$ maps the input to a fixed-size latent representation $z = e_\theta(x)$
3. **Decoding**: The decoder $d_\phi(z)$ reconstructs the output $\hat{x} = d_\phi(z)$
4. **Loss Computation**: The reconstruction error is computed and backpropagated

$$\text{loss function} = ||x - \hat{x}||^2 = ||x - d_\phi(z)||^2 = ||x - d_\phi(e_\theta(x))||^2$$

### Similarity to PCA
They are both dimensionality reduction techniques. However, PCA has orthogonality constraints whereas Auto-encoder doesn't. Without the orthogonality constriant, autoencoder can end up in several basis of subspaces. This makes Auto-encoder more capable to learn powerful representations in lower dimensions (with its non-linear activation functions and more hidden layers) with much less information loss.

### Limitations
- Lack of regularity, its latent space is not regular (leads to sever overfitting, some points of the latent space will give meaningless content once decoded), unable to use this for content generation
- While autoencoders can reduce the dimension of data, it may not necessarily retain the data structure information in reduced dimension

## Variational Auto-encoder

Idea: being an autoencoder that can generate new samples from its regularised latent space.

![VAE architecture diagram](/images/autoencoder_vae/vae_image.png)

### Training Steps:
1. **Input Processing**: The input data $x$ is encoded as distribution over the latent space $p(z|x)$ (enforced to be close to a standard normal distribution so that mean and variance )
2. **Encoding**: sample a point form the encoder latent space $p(z|x)$ such that the sampled latent representation z follows the latent space distribution, i.e. $z$ ~ $p(z|x)$
3. **Decoding**: The decoder $d_\phi(z)$ reconstructs the output $\hat{x} = d_\phi(z)$
4. **Loss Computation**: The reconstruction error is computed and backpropagated

$$\text{loss function} = ||x - \hat{x}||^2 + KL[N(\mu_x, \sigma_x), N(0,1)] = ||x - d_\phi(\mu_x + \sigma_x\epsilon)||^2 + KL[N(\mu_x, \sigma_x), N(0,1)]$$

This loss function ensures that the input is reconstructed (reconstruction loss in first part), and the latent space should be normally distribututed (similarity loss/ regularization loss in second part)

Kullback-Leibler divergence is used to measure the differences between the returned distribution and the standard Gaussian. This way, we require the covariance matrices to be close to the identity, preventing punctual distributions, and the mean to be close to 0, preventing encoded distributions to be too far apart from each others. Without this constraints, the neural network will behave almost like the classic autoencoder.

![VAE regularization image](/images/autoencoder_vae/vae_regularization.png)


## Application

Autoencoder is used in the 'Perceptual Compression' phase of original Stable Diffusion model in 2021. Its aim is to provide a lower-dimensional representation space which is perceptually equivalent to the data space.

![Stable Diffusion Graph](/images/autoencoder_vae/SD_diagram.png)

A modification of VAE -  discrete variational autoencoder (dVAE, also similar to VQVAE) is used in the original Dall-e model. It uses a discrete latent space instead of a continuous one.

![VQVAE architecture image](/images/autoencoder_vae/vqvae.png)

### Reference
- 
- J. Rocca, “Understanding Variational Autoencoders (VAEs) - TDS Archive - Medium,” Medium, Sep. 24, 2019. https://medium.com/data-science/understanding-variational-autoencoders-vaes-f70510919f73
- A. Anwar, “Difference between AutoEncoder (AE) and Variational AutoEncoder (VAE) | Towards Data Science,” Towards Data Science, Nov. 03, 2021. https://towardsdatascience.com/difference-between-autoencoder-ae-and-variational-autoencoder-vae-ed7be1c038f2
- R. Rombach, A. Blattmann, D. Lorenz, P. Esser, and B. Ommer, “High-Resolution Image Synthesis with Latent Diffusion Models,” Apr. 2022. Available: https://arxiv.org/pdf/2112.10752
- A. Van Den, O. Deepmind, V. Oriol, Deepmind, and K. Deepmind, “Neural Discrete Representation Learning.” Available: https://arxiv.org/pdf/1711.00937
‌