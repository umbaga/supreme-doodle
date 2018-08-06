-- FUNCTION: public.get_dice(bigint)

-- DROP FUNCTION public.get_dice(bigint);

CREATE OR REPLACE FUNCTION public.get_dice(
	"diceId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_build_object(
	'id', dice.id
	, 'dieCount', dice."dieCount"
	, 'dieType', dice."dieType"
	, 'modifier', dice."modifier"
	, 'multiplier', dice."multiplier"
	, 'divisor', dice."divisor"
	, 'rendered', CASE 
		WHEN modifier != 0 THEN concat_ws('+', concat_ws('d', "dieCount", "dieType"), "modifier")
		WHEN multiplier != 1 THEN concat_ws('x', concat_ws('d', "dieCount", "dieType"), "multiplier")
		WHEN divisor != 1 THEN concat_ws('/', concat_ws('d', "dieCount", "dieType"), "divisor")
		ELSE concat_ws('d', "dieCount", "dieType")
		END
)
FROM adm_core_dice dice
WHERE dice.id = $1

$BODY$;

ALTER FUNCTION public.get_dice(bigint)
    OWNER TO postgres;
