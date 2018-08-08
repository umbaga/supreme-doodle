-- FUNCTION: public.get_assigned_equipment(bigint, bigint)

-- DROP FUNCTION public.get_assigned_equipment(bigint, bigint);

CREATE OR REPLACE FUNCTION public.get_assigned_equipment(
	"itemId" bigint,
	"linkTypeId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(
	json_build_object(
		'id', arri.id
		, 'name', arri."itemName"
		, 'cost', eq."cost"
		, 'weight', eq."weight"
		, 'unit', unt."unit"
		, 'count', unt."count"
		, 'assigned', lnkcnt."count"
	)
)
FROM adm_core_item i
INNER JOIN adm_link lnk ON lnk."referenceId" = i.id
INNER JOIN adm_core_item arri ON arri.id = lnk."targetId" AND lnk."typeId" = $2
INNER JOIN adm_def_equipment eq ON eq."equipmentId" = lnk."targetId"
LEFT OUTER JOIN adm_def_equipment_unit unt ON unt."equipmentId" = i.id
INNER JOIN adm_link_count lnkcnt ON lnkcnt."linkId" = lnk.id
WHERE i.id = $1

$BODY$;

ALTER FUNCTION public.get_assigned_equipment(bigint, bigint)
    OWNER TO postgres;
