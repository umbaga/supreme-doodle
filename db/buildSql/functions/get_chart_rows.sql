-- FUNCTION: public.get_chart_rows(bigint)

-- DROP FUNCTION public.get_chart_rows(bigint);

CREATE OR REPLACE FUNCTION public.get_chart_rows(
	"chartId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(json_build_object(
	'id', rw.id,
	'rowIndex', rw."rowIndex",
	'text', get_description(rw.id, 1072),
	'picklistItem', get_item(pcklstitmlnk."targetId"),
	'diceRange', json_build_object(
		'minimum', rng."minimum",
		'maximum', rng."maximum"
	)
))
FROM adm_def_chart_row rw
LEFT OUTER JOIN adm_link pcklstitmlnk ON pcklstitmlnk."referenceId" = rw.id
LEFT OUTER JOIN adm_link_value_number_range rng ON rng."linkId" = pcklstitmlnk.id
WHERE rw."chartId" = $1

$BODY$;

ALTER FUNCTION public.get_chart_rows(bigint)
    OWNER TO postgres;
