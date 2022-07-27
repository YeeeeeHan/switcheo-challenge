SELECT T1.address
FROM(
	SELECT X.address
	FROM(
		SELECT address,
		CASE
		 WHEN denom = 'swth' THEN amount * 0.00000005
		 WHEN denom = 'usdc' THEN amount * 0.000001
		 WHEN denom = 'tmz' THEN amount * 0.003
		END AS convertedAmount
		FROM balances b
		) as X
	GROUP BY X.address
	HAVING SUM(X.convertedAmount) >500
	) T1
INNER JOIN trades T2
ON T1.address = T2.address
WHERE T2.block_height > 730000