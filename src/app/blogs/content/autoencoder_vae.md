# Auto-encoder, Variational Auto-encoder and Stable Diffusion

Date: July 10 2025

## Auto-encoder

### Training Steps:
1. **Input Processing**: The input data $x$ is fed directly into the encoder network
2. **Encoding**: The encoder $e_\theta(x)$ maps the input to a fixed-size latent representation $z = e_\theta(x)$
3. **Decoding**: The decoder $d_\phi(z)$ reconstructs the output $\hat{x} = d_\phi(z)$
4. **Loss Computation**: The reconstruction error is computed and backpropagated


Loss function: $$\text{loss} = ||x - \hat{x}||_2 = ||x - d_\phi(z)||_2 = ||x - d_\phi(e_\theta(x))||_2$$

## Variational Auto-encoder

## Stable Diffusion

Also mention Dall-e with just simple diagrams.

### Reference
