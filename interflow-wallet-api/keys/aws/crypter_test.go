package aws

import (
	"bytes"
	"testing"

	"github.com/interflowrepo/interflow/interflow-wallet-api/configs"
	"github.com/interflowrepo/interflow/interflow-wallet-api/keys/encryption"
)

// Needs to be run manually with proper env configuration
// It's skipped during standard test execution
func TestCrypter(t *testing.T) {
	cfg := configs.ParseTestConfig(t)

	if cfg.EncryptionKeyType != encryption.EncryptionKeyTypeAWSKMS {
		t.Skip("skipping since EncryptionKeyType is not", encryption.EncryptionKeyTypeAWSKMS)
	}

	// encrypt the test plaintext message
	crypter := AWSKMSCrypter{keyARN: cfg.EncryptionKey}
	plaintext := []byte("this is a test message in plaintext")
	encrypted, err := crypter.Encrypt(plaintext)
	if err != nil {
		t.Fatal(err)
	}

	// decrypt the encrypted plaintext
	decrypted, err := crypter.Decrypt(encrypted)
	if err != nil {
		t.Fatal(err)
	}

	if !bytes.Equal(decrypted, plaintext) {
		t.Fatal("decrypted does not match original plaintext message")
	}
}
