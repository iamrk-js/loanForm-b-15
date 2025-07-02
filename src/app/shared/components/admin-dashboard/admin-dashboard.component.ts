import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LoanService } from '../../services/loan.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['user', 'amount', 'tenure', 'status', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<any>();
  statusFilter = 'all';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private loanService: LoanService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getAllLoans().subscribe({
      next: (loans: any) => {
        this.dataSource.data = loans;
        this.dataSource.paginator = this.paginator;
      },
      error: () => this.snackbar.showError('Failed to load loans')
    });
  }

  updateStatus(loanId: string, status: string): void {
    this.loanService.updateLoanStatus(loanId, status).subscribe({
      next: (updatedLoan) => {
        const index = this.dataSource.data.findIndex(l => l._id === loanId);
        this.dataSource.data[index] = updatedLoan;
        this.dataSource._updateChangeSubscription();
        this.snackbar.showSuccess(`Loan ${status} successfully`);
      },
      error: () => this.snackbar.showError('Failed to update status')
    });
  }

  applyFilter(): void {
    this.dataSource.data = this.statusFilter === 'all' 
      ? this.dataSource.data 
      : this.dataSource.data.filter(loan => loan.status === this.statusFilter);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'approved':
        return 'primary'; // Blue color for approved loans
      case 'rejected':
        return 'warn'; // Red color for rejected loans
      default:
        return ''; // Default color for pending loans
    }
  }
}