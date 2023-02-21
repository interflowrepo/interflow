package m20221220

import (
	"time"

	"gorm.io/gorm"
)

const ID = "20221220"

// State is a type for Job state.
type State string

type Storable struct {
	ID             int            `json:"-" gorm:"primaryKey"`
	AccountAddress string         `json:"-" gorm:"index"`
	Index          int            `json:"index" gorm:"index"`
	Type           string         `json:"type"`
	Value          []byte         `json:"-"`
	PublicKey      string         `json:"publicKey"`
	SignAlgo       string         `json:"signAlgo"`
	HashAlgo       string         `json:"hashAlgo"`
	CreatedAt      time.Time      `json:"createdAt"`
	UpdatedAt      time.Time      `json:"updatedAt"`
	DeletedAt      gorm.DeletedAt `json:"-" gorm:"index"`
}

func (Storable) TableName() string {
	return "storable_keys"
}

type Account struct {
	Address   string     `gorm:"primaryKey"`
	Keys      []Storable `gorm:"foreignKey:AccountAddress;references:Address;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	InterflowUserId string `json:"InterflowUserId,omitempty"`
	Type      string     `gorm:"default:custodial"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}


func Migrate(tx *gorm.DB) error {
	if err := tx.Migrator().AddColumn(&Account{}, "interflow_user_id"); err != nil {
		return err
	}

	return nil
}

func Rollback(tx *gorm.DB) error {
	if err := tx.Migrator().DropColumn(&Account{}, "interflow_user_id"); err != nil {
		return err
	}

	return nil
}
