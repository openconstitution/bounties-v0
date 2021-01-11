import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import FilterListIcon from '@material-ui/icons/FilterList';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, createStyles, Toolbar, Tooltip, IconButton, lighten, TableContainer, Table, TableBody, TablePagination, FormControlLabel, Switch, Collapse, Link } from '@material-ui/core';
import clsx from 'clsx';
import { IBounty } from 'app/shared/model/bounty.model';

const useStyles = makeStyles((theme) => ({
  features: {
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(10),
      borderLeftWidth: 1,
      borderLeftStyle: 'solid',
      borderColor: '#E8EAF6',
    }
  },
  primaryAction: {
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  iconWrapper: {
    backgroundColor: fade('#E8EAF6', .6),
  },
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof IBounty;
  label: string;
  alignment: string;
  size: string
}

const headCells: HeadCell[] = [
  { id: 'summary', alignment: 'left', size: 'medium', disablePadding: true, label: '' },
  { id: 'type', alignment: 'left', size: 'small', disablePadding: false, label: 'Type' },
  { id: 'category', alignment: 'left', size: 'small', disablePadding: false, label: 'Category' },
  { id: 'experience', alignment: 'left', size: 'small', disablePadding: false, label: 'Difficulty' },
  { id: 'amount', alignment: 'right', size: 'small', disablePadding: false, label: 'Bounty' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IBounty) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof IBounty) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
					{null}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            align={headCell.alignment.toString()}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Bounties
      </Typography>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

// function Row(props: { row: ReturnType<typeof createData>, isItemSelected: any, labelId: string }) {
function Row(props: { row: IBounty, isItemSelected: any, labelId: string }) {
  const { row, isItemSelected, labelId } = props;
	const [open, setOpen] = React.useState(false);
	
  const content = {
    'primary-action': 'Learn More'
  };

	return (
		<React.Fragment>
			<TableRow
				hover
				onClick={() => setOpen(!open)}
				role="checkbox"
				aria-checked={isItemSelected}
				tabIndex={-1}
				key={row.summary}
				selected={isItemSelected}
			>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" id={labelId} scope="row" size="medium" padding="none">
          <Box pt={1}>
            <Typography variant="subtitle2" gutterBottom>
              {row.summary}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Created on {
                new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit"
                }).format(new Date(row.createdDate))
              } by <Link variant="caption" href={`/hunter/${row.createdBy}`}>{row.createdBy}</Link>
            </Typography>
          </Box>
				</TableCell>
        
         {/* @ts-ignore */}
				<TableCell align="left" width="14%">{row.type}</TableCell>
         {/* @ts-ignore */}
				<TableCell align="left" width="14%">{row.category}</TableCell>
         {/* @ts-ignore */}
				<TableCell align="left" width="14%">{row.experience}</TableCell>
         {/* @ts-ignore */}
				<TableCell align="right" width="9%">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(row.amount)}
        </TableCell>
			</TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">Description</Typography>
              <Typography variant="subtitle1" component="p" color="textSecondary">{row.description}</Typography>
              
              <Button size="small" color="primary" href={`bounty/${row.id}`}>
                {content['primary-action']}
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
		</React.Fragment>
	);
}

export default function BountyList(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IBounty>('id');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const content = {
    ...props.content,
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IBounty) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = content.bounties.map((n) => n.summary);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // eslint-disable-next-line @typescript-eslint/prefer-includes
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, content.bounties.length - page * rowsPerPage);

  return (
    <section>
      <Container maxWidth="lg">
        <Box pt={10} pb={12}>
					<EnhancedTableToolbar numSelected={selected.length} />
					<TableContainer>
						<Table
							className={classes.table}
							aria-labelledby="tableTitle"
							size={dense ? 'small' : 'medium'}
							aria-label="enhanced table"
						>
							<EnhancedTableHead
								classes={classes}
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={content.bounties.length}
							/>
							<TableBody>
								{stableSort(content.bounties, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										const isItemSelected = isSelected(row.summary.toString());
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
                      <Row
                        key={row.summary}
                        isItemSelected={isItemSelected}
                        labelId={labelId}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        row={row} />
										);
									})}
								{emptyRows > 0 && (
									<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={content.bounties.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
        </Box>
				{/* <FormControlLabel
					control={<Switch checked={dense} onChange={handleChangeDense} />}
					label="Dense padding"
				/> */}
      </Container>
    </section>
  );
}
