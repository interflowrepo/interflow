package test

import (
	"fmt"
	"time"

	"github.com/interflowrepo/interflow/interflow-wallet-api/jobs"
)

func WaitForJob(jobSvc jobs.Service, jobId string) (*jobs.Job, error) {
	for {
		if job, err := jobSvc.Details(jobId); err != nil {
			return nil, err
		} else if job.State == jobs.Failed {
			return nil, fmt.Errorf(job.Error)
		} else if job.State == jobs.Complete {
			return job, nil
		}
		time.Sleep(100 * time.Millisecond)
	}
}
