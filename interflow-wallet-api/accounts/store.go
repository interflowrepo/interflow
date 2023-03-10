package accounts

import (
	"github.com/interflowrepo/interflow/interflow-wallet-api/datastore"
)

// Store manages data regarding accounts.
type Store interface {
	// List all accounts.
	Accounts(datastore.ListOptions) ([]Account, error)

	// Get account details.
	Account(address string) (Account, error)

	// Insert a new account.
	InsertAccount(a *Account) error

	// Update an existing account.
	SaveAccount(a *Account) error

	// Permanently delete an account, despite of `DeletedAt` field.
	HardDeleteAccount(a *Account) error
}
